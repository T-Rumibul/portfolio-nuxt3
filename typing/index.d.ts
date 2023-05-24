export interface IconProps {
  fill?: string;
  stroke?: string;
}

export interface DynamicText {
  text: string[];
  speed?: number;
}

export interface Project {
  _id: string;
  title: string;
  link: string;
  git: string;
  pages: string[];
  image: string;
  tech: string[];
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
  target?: string;
  external?: boolean;
}
