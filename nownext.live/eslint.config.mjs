import withNuxt from './.nuxt/eslint.config.mjs'
import security from 'eslint-plugin-security'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  {
    plugins: {
      security
    },
    rules: {
      ...security.configs.recommended.rules
    }
  },
  eslintConfigPrettier
)
