import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  alias: {
    "@": "/",
  },
  meta: {
    title: "Naice",
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "cleartype", content: "on" },
      { "http-equiv": "Cache-Control" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no",
      },
      { hid: "description", name: "description", content: "naice blog, 前端, blog" },
      {
        hid: "keywords",
        name: "keywords",
        content: "前端开发，JavaScript, Node, Vue，nuxt",
      },
      { name: "author", content: "370215230@qq.com" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://img.store.naice.me/jquery.min.js" },
      { src: "https://img.store.naice.me/highlight.min.js" },
    ],
  },
  css: ["@/assets/css/init.css"],
  loading: { color: "#3B8070" },
});
