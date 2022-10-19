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
    }
  });
}
