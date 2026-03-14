// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillsOnChainSBT is ERC721, Ownable {

    uint256 private _tokenIds;

    struct Skill {
        string skillName;
        string metadataURI;
        address issuer;
        bool revoked;
    }

    mapping(uint256 => Skill) public skills;
    mapping(address => bool) public authorizedIssuers;

    constructor() ERC721("SkillsOnChain", "SKILL") Ownable(msg.sender) {}

    // -------- Admin controls --------
    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function revokeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }

    // -------- Issue Skill (SBT) --------
    function issueSkill(
        address to,
        string calldata skillName,
        string calldata metadataURI
    ) external returns (uint256) {

        require(authorizedIssuers[msg.sender], "Not authorized issuer");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(to, newTokenId);

        skills[newTokenId] = Skill({
            skillName: skillName,
            metadataURI: metadataURI,
            issuer: msg.sender,
            revoked: false
        });

        return newTokenId;
    }

    // -------- Revoke Skill --------
    function revokeSkill(uint256 tokenId) external {
        require(skills[tokenId].issuer == msg.sender, "Only issuer can revoke");
        skills[tokenId].revoked = true;
    }

    // -------- Soulbound enforcement (OZ v5 way) --------
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        // allow minting only
        if (from != address(0)) {
            revert("Soulbound: transfers disabled");
        }

        return super._update(to, tokenId, auth);
    }
}