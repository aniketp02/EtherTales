// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts@4.9.5/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.5/access/Ownable.sol";


contract StorybookPlatform is ERC721URIStorage, Ownable {
    // Define a struct to store information about each story
    struct StoryInfo {
        address user;
        uint256 tokenId;
        uint256 storyLength;
    }

    mapping(uint256 => string) private ipfsHashes;
    mapping(address => StoryInfo[]) private userStorybooks;
    mapping(address => uint256) private userStorybooksCount;
    address[] private uniqueUsers;

    uint256 private nextTokenId = 0;

    constructor(address initialOwner) 
        ERC721("StorybookNFT", "SBNFT")
        // Ownable(initialOwner)
        {}

    function addNewUser(address newUser) internal {
        if (!userExists(newUser)) {
            uniqueUsers.push(newUser);
        }
    }

    function userExists(address user) internal view returns (bool) {
        for (uint256 i = 0; i < uniqueUsers.length; i++) {
            if (uniqueUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    // External function to create a new storybook
    function createStorybook(string[] memory _ipfsHashes) external returns (bool) {
        require(_ipfsHashes.length > 0, "Invalid input length");

        uint256 _tokenId = nextTokenId++;
        addNewUser(msg.sender);

        // Mint individual tokens for each IPFS hash in the array
        for (uint256 i = 0; i < _ipfsHashes.length; i++) {
            ipfsHashes[_tokenId + i] = _ipfsHashes[i];
            _safeMint(msg.sender, _tokenId + i);
        }

        // Update the nextTokenId to the last minted token ID
        nextTokenId = _tokenId + _ipfsHashes.length;

        StoryInfo memory newStory = StoryInfo({
            user: msg.sender,
            tokenId: _tokenId,
            storyLength: _ipfsHashes.length
        });
        userStorybooks[msg.sender].push(newStory);
        userStorybooksCount[msg.sender] += 1;

        return true;
    }

    // External function to get the count of storybooks for a user
    function getUserStorybooksCount(address user) external view returns (uint256) {
        return userStorybooksCount[user];
    }

    // External function to get the storybooks for a user
    function getUserStorybooks(address user) external view returns (StoryInfo[] memory) {
        return userStorybooks[user];
    }

    // External function to get all storybooks
    function getAllStorybooks() external view returns (StoryInfo[] memory) {
        uint256 totalStorybooks = 0;

        for (uint256 i = 0; i < uniqueUsers.length; i++) {
            address currentUser = uniqueUsers[i];
            totalStorybooks += userStorybooksCount[currentUser];
        }

        // Create an array to store all storybooks
        StoryInfo[] memory allStorybooks = new StoryInfo[](totalStorybooks);
        uint256 currentIndex = 0;

        // Loop through all users to populate the array
        for (uint256 i = 0; i < uniqueUsers.length; i++) {
            address currentUser = uniqueUsers[i];
            StoryInfo[] memory userStorybooksArray = userStorybooks[currentUser];

            // Loop through the user's storybooks and add them to the result array
            for (uint256 j = 0; j < userStorybooksCount[currentUser]; j++) {
                allStorybooks[currentIndex++] = userStorybooksArray[j];
            }
        }

        return allStorybooks;
    }

    // External function to get the IPFS hashes of a specific storybook
    function getStorybookDetails(StoryInfo memory newStoryInfo) external view returns (string[] memory _ipfsHashes) {
        uint256 tokenId = newStoryInfo.tokenId;
        uint256 storyLength = newStoryInfo.storyLength;

        _ipfsHashes = new string[](storyLength);

        for (uint256 i = 0; i < storyLength; i++) {
            _ipfsHashes[i] = getIpfsHash(tokenId + i);
        }

        return _ipfsHashes;
    }

    // External function to get the IPFS hash for a specific token ID
    function getIpfsHash(uint256 tokenId) public view returns (string memory) {
        return ipfsHashes[tokenId];
    }
}
