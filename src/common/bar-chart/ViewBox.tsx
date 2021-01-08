import { Dimensions } from "react-native";

export class ViewBox {
  private DEFAULT_VIEWBOX_WIDTH = Dimensions.get("window").width;
  private DEFAULT_VIEWBOX_HIEGHT = Dimensions.get("window").height;

  private width = this.DEFAULT_VIEWBOX_WIDTH;
  private height = this.DEFAULT_VIEWBOX_HIEGHT;

  constructor({ width, height }: { width?: number; height?: number }) {
    this.width = width ?? this.DEFAULT_VIEWBOX_WIDTH;
    this.height = height ?? this.DEFAULT_VIEWBOX_HIEGHT;
  }

  getWidth = (): number => this.width;

  getHeight = (): number => this.height;
}
