declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Classes {
  [className: string]: boolean
}

interface Styles {
  [propName: string]: string | null
}
