import path from 'path';
import type { GatsbyNode } from "gatsby";
import type { Query } from "./graphql-types";

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  try {
    const pageTemplate = path.resolve('./src/templates/page.tsx');

    const result = await graphql<Query>(
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
        `
    );

    if(result.errors) {
      reporter.panicOnBuild(
        `There was an error loading your Contentful posts`, result.errors);
      return;
    }
  
    const posts = result.data?.allContentfulSkill.edges ?? [];

    posts.forEach(post => {
      createPage({
        path: `/${post.node.slug}/`,
        component: pageTemplate,
        context: {
          slug: post.node.slug,
        },
      });
    });
  }
  catch(err) {
    console.log(err);
  }
};
