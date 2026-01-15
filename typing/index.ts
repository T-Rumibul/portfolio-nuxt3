import type { Types } from "mongoose";

export interface IconProps {
  fill?: string;
  stroke?: string;
}

export interface DynamicText {
  text: string[];
  speed?: number;
}

export interface IResumeItem {
  name: string;
  position: string;
  aboutme: string;
}
export interface IResume {
  _id: string;
  en: IResumeItem;
  ru: IResumeItem;
  uk: IResumeItem;
  skillCategories: ISkillCategory[];
  contacts: IContact[];
}
export interface IIcon {
    name: string;
    color: string;
}
export interface ISkill {
    icon: IIcon;
    name: string
}
export interface ISkillCategory {
    icon: IIcon;
    name: string;
    skills: ISkill[]
}
export interface IContact {
  icon: IIcon;
  name: string;
  link: string;
}

export interface ILangFramework {
    icon: IIcon;
    value: string;
}
export interface ILocalized {
    en: string;
    ru: string;
    uk: string;
}
export interface IProject {
    _id: string;
    type: { icon: IIcon; value: string };
    title: ILocalized;
    description: ILocalized;
    lang: ILangFramework[];
    framework: ILangFramework[];
    git?: string;
    link?: string;
    thumbnail: string;
    hidden?: boolean;
}


export interface IRefreshToken {
    _id: string;
    token: string;
    username: string;
    validUntil: Date;
}

export interface TurnstileScript {
  execute: (token: string) => void;
  reset: () => void;
  getResponse: () => string;
  render: (element: HTMLElement, options: any) => void;
}

export type APIResponse<T> =
   {
      success: true
      message: string
      result: T
    }
  | {
      success: false
      message: string
    }

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
}

export interface IAuthVerifyResponse {
    success: boolean;
}