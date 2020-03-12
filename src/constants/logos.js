import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import reddit from '../assets/reddit.png';
import instagram from '../assets/instagram.png';
import youtube from '../assets/youtube.png';
import linkedin from '../assets/linkedin.png';

export default entity => {
    switch (entity) {
        case 'facebook':
            return facebook;
        case 'twitter':
            return twitter;
        case 'reddit':
            return reddit;
        case 'instagram':
            return instagram;
        case 'linkedin':
            return linkedin;
        case 'youtube':
            return youtube;
        default:
    }
};
