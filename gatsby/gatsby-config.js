import dotenv from 'dotenv';

dotenv.config({ path: ".env" });

export default {
    siteMetadata: {
        title: `Slick slices`,
        siteUrl: 'https://www.webmasteronlinedev.com',
        description: 'Website for Best web developement experience you will have!',
        twitter: '@mohammedrezq2',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'te0glnca',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        }
    ]
};