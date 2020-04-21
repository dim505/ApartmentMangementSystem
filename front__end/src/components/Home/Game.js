import React, { Component } from "react";
import { Layer, Circle, Rect } from "react-konva";
import Field from "./Field";
import Ball from "./Ball";

export default class Game extends Component {
  render() {
    return (
      <Layer>
        <Field />
        {/* You can add or remove Balls here to see how they behave */}
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
      </Layer>
    );
  }
}
