const HotelContract = artifacts.require("HotelContract");

module.exports = function (deployer) {
  deployer.deploy(HotelContract);
};