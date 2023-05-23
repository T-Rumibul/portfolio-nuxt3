export interface IconProps {
  fill?: string;
  stroke?: string;
}

export interface DynamicText {
  text: string[];
  speed?: number;
}

export interface Button {
  to?: string;
  iconName?: "chat" | "home" | "portfolio" | "user";
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  borderColor?: string;
  textSize?: number;
  textWeight?: number;
  buttonBg?: string;
  hoverFill?: string;
  textUpperCase?: boolean;
  download?: string;
  minWidth?: number;
}
