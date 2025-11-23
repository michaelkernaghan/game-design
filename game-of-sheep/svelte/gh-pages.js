var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/michaelkernaghan/sheepsvelte.git', // Update to point to your repository  
        user: {
            name: 'Michael Kernaghan', // update to use your name
            email: 'michaelkernaghan@ecadlabs.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)