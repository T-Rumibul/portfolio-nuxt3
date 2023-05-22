export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      home_hello: "Hi there!",
      home_im: "I'm",
      home_more:
        "To learn more about me or view my portfolio click one of the buttons below or use the nav menu at the top left corner.",
      home_link_portfolio: "My Portfolio",
      home_link_about: "My Resume",
      home_dynamic_text: ["Andrey", "a web developer."],
    },
    ru: {
      home_hello: "Привет!",
      home_im: "Я",
      home_more:
        "Чтобы узнать больше обо мне или просмотреть мое портфолио, нажмите одну из кнопок ниже или используйте меню навигации в верхнем левом углу.",
      home_link_portfolio: "Портфолио",
      home_link_about: "Резюме",
      home_dynamic_text: ["Андрей", "Веб разработчик."],
    },
  },
}));
