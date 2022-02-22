// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract GoldenScarletSwords is ERC721A, IERC2981, AccessControl {
    using Strings for uint256;

    bytes32 public constant MUNKSTAFF_ROLE = keccak256("MUNKSTAFF_ROLE");

    address payable public depositAddress =
        payable(0x254F9595cA1C2E567C51d5B44f0f43Cf485ef154);
    uint256 public maxMintable = 10000;
    string private baseUri = "https://www.munksnft.com/api/swords/";
    uint256 public royaltiesPercentage = 7;

    constructor(address[] memory munksStaff)
        ERC721A("FantomMunks SWORDS - Golden Scarlet", "SWORDSGS")
    {
        for (uint256 i = 0; i < munksStaff.length; ++i) {
            _setupRole(MUNKSTAFF_ROLE, munksStaff[i]);
        }
    }

    function airdrop(uint256[] memory quantities, address[] memory receivers)
        public
        payable
    {
        require(
            hasRole(MUNKSTAFF_ROLE, msg.sender),
            "Not part of the MUNKSTAFF"
        );

        for (uint256 i = 0; i < receivers.length; i++) {
            _safeMint(receivers[i], quantities[i]);
        }
    }

    function setBaseURI(string memory newURI) public {
        require(
            hasRole(MUNKSTAFF_ROLE, msg.sender),
            "Not part of the MUNKSTAFF"
        );
        baseUri = newURI;
    }

    // Change the deposit address
    function setDepositAddress(address payable to) public {
        require(
            hasRole(MUNKSTAFF_ROLE, msg.sender),
            "Not part of the MUNKSTAFF"
        );
        depositAddress = to;
    }

    function _burn(uint256 tokenId) internal override(ERC721A) {
        super._burn(tokenId);
    }

    // Returnes the URI of the token
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721A)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, IERC165, AccessControl)
        returns (bool)
    {
        return
            type(IERC2981).interfaceId == interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // Change royalties percentage in secondary sales
    function setRoyaltiesPercentage(uint256 newPercentage) public {
        require(
            hasRole(MUNKSTAFF_ROLE, msg.sender),
            "Not part of the MUNKSTAFF"
        );
        royaltiesPercentage = newPercentage;
    }

    // EIP-2981: Royalty Standard
    function royaltyInfo(uint256 tokenId, uint256 _salePrice)
        external
        view
        override(IERC2981)
        returns (address receiver, uint256 royaltyAmount)
    {
        uint256 _royalties = ((_salePrice * royaltiesPercentage) / 100);
        return (depositAddress, _royalties);
    }
}
