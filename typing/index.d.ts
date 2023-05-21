export interface IconProps {
    fill?: string,
    stroke?: string
}

export interface DynamicText {
    text: string[]
    speed?: number
}

export interface Button {
    to?: string,
    iconName: "IconChat" | "IconHome" | "IconPortfolio" | "IconUser"
    iconSize?: number
    iconColor?: string
    textColor?: string
    borderColor?: string
    textSize?: number
    textWeight?: number
    buttonBg?: string
    hoverFill?: string
    textUpperCase?: boolean

}