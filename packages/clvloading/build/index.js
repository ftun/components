"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _palaceCorona = _interopRequireDefault(require("./palace-corona.png"));

require("./index.css");

/**
* @author Equipo Desarrollo Clever MID <clevermerida@palace-resorts.local>
* Componente Loading migrado de Complib
*/
var Loading = function Loading(_ref) {
  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: show ? 'inside' : 'outside'
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-section-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-0-1"
  }), /*#__PURE__*/_react["default"].createElement("img", {
    className: "loader-img",
    src: _palaceCorona["default"]
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-section-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "section-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-1-1"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-1-4"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-1-5"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-section-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-2-1"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "loader-2-2"
  }))));
};

var _default = Loading;
exports["default"] = _default;