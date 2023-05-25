export default (context, inject) => {
  inject('common', {
    thumbnail(course) {
      if(course.thumbnail && course.thumbnail.length){
        return course.thumbnail;
      }

      if(course.episodes.length && course.episodes[0].video_url.length){
        const youtube_id = course.episodes[0].video_url.split('/').pop();
        return `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`;
      }

      return `https://picsum.photos/800/400?rand=${Math.random() * 1000}`;
    },
    episodeThumbnail(episode) {
      const youtube_id = episode.video_url.split('/').pop();
      return `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`;
    },
    redirectBack(){
      if(process.client){
        const redirectUrl = localStorage.getItem("callbackredirect");
        if(redirectUrl){
          localStorage.removeItem("callbackredirect");
          location.href = redirectUrl;
        }
      }
    },
    head(){
      const description = `Watch video courses on blockchain development for the EOS Network`;
      const title = `Learn EOS Blockchain Development`;
      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'og:title', property: 'og:title', content: title },
          { hid: 'og:image', property: 'og:image', content: 'https://learn.eosnetwork.com/og_image.png' },
          { hid: 'og:description', property: 'og:description', content: description },
          { hid: 'twitter:title', name: 'twitter:title', content: title },
          { hid: 'twitter:description', name: 'twitter:description', content: description },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        ],
      };
    }
  });
}
