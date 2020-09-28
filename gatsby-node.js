const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/page.tsx');
    resolve(
      graphql(
        `
          {
            allContentfulSkill {
              edges {
                node {
                  skillName
                  slug
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulSkill.edges;
        posts.forEach(post => {
          createPage({
            path: `/${post.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: post.node.slug,
            },
          });
        });
      }),
    );
  });
};
