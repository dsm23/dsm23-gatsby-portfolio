/* eslint-disable import/no-extraneous-dependencies */
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.[jt]s?(x)', './public/index.html'],

  // This is the function used to extract class names from your templates
  defaultExtractor: content => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/className="(.*)"/gi) || [];

    return broadMatches.concat(innerMatches);
  },
  rejected: true,
});

module.exports = {
  plugins: [tailwind, purgecss],
};
