class ApiService {
    private NUXT_CONTEXT:any = null;

    constructor(context:any) {
        this.NUXT_CONTEXT = context;

    }

    GET(url:string) {
        this.NUXT_CONTEXT.$axios.setHeader('Content-Type', 'application/json');
        this.NUXT_CONTEXT.$axios.setHeader('Authorization', this.NUXT_CONTEXT.$auth.strategy.token.get());
        return this.NUXT_CONTEXT.$axios.get(`${this.NUXT_CONTEXT.$config.BACKEND_API}/${url}`).then(x => x.data);
    }

    POST(url:string, data:any) {
        this.NUXT_CONTEXT.$axios.setHeader('Content-Type', 'application/json');
        this.NUXT_CONTEXT.$axios.setHeader('Authorization', this.NUXT_CONTEXT.$auth.strategy.token.get());
        return this.NUXT_CONTEXT.$axios.post(`${this.NUXT_CONTEXT.$config.BACKEND_API}/${url}`, data).then(x => x.data);
    }

    async isLoggedIn() {
      if(!this.NUXT_CONTEXT.$auth.strategy.token.get()) return;
        return await this.GET('auth/status').then(() => true).catch(err => {
          console.error('Auth status error', err);
          return false;
        });
    }

    async getUser(){
      if(!this.NUXT_CONTEXT.$auth.strategy.token.get()) return;
        return await this.GET('user').then(user => {
          if(user.hasOwnProperty('error')) throw new Error(user.error_msg);

          this.NUXT_CONTEXT.store.dispatch('setUser', user);
          return user;
        }).catch(err => {
          console.error('User error', err);
          return null;
        });
    }

    async getProfile(user_id:string){
        return await this.GET(`user/${user_id}`).then(user => {
          if(user.hasOwnProperty('error')) throw new Error(user.error_msg);
          return user;
        }).catch(err => {
          console.error('User error', err);
          return null;
        });
    }

    async getBounty(slug:string){
        return await this.GET(`bounty/${slug}`).then(bounty => {
          if(bounty.hasOwnProperty('error')) throw new Error(bounty.error_msg);
          return bounty;
        }).catch(err => {
          console.error('Bounty error', err);
          return null;
        });
    }

    async getBounties(type:number = 0){
        return await this.GET(`bounties/${type}`).then(bounties => {
          if(bounties.hasOwnProperty('error')) throw new Error(bounties.error_msg);
          return bounties;
        }).catch(err => {
          console.error('Bounty error', err);
          return null;
        });
    }

    async getCourses(){
        return await this.GET(`courses`).then(courses => {
          if(courses.hasOwnProperty('error')) throw new Error(courses.error_msg);
          return courses;
        }).catch(err => {
          console.error('Course error', err);
          return null;
        });
    }

    async getCourse(slug:string){
        return await this.GET(`course/${slug}`).then(courses => {
          if(courses.hasOwnProperty('error')) throw new Error(courses.error_msg);
          return courses;
        }).catch(err => {
          console.error('Course error', err);
          return null;
        });
    }

    async getContinueWatching(){
        return await this.GET(`courses/continue-watching`).then(courses => {
          if(courses.hasOwnProperty('error')) throw new Error(courses.error_msg);
          return courses;
        }).catch(err => {
          console.error('Course error', err);
          return null;
        });
    }

    async submitAnswers(progress:any){
      return await this.POST(`progress/answers`, progress).then(progress => {
          if(progress.hasOwnProperty('error')) throw new Error(progress.error_msg);
          return progress;
        });
    }

    async finishedCourse(course_slug_hash:string){
      return await this.GET(`progress/finished/${course_slug_hash}`).then(progress => {
          if(progress.hasOwnProperty('error')) throw new Error(progress.error_msg);
          return progress;
        });
    }

    async getProgress(course_slug_hash:string){
      return await this.GET(`progress/${course_slug_hash}`).then(progress => {
          if(progress.hasOwnProperty('error')) throw new Error(progress.error_msg);
          return progress;
        });
    }

    async getBadAnswers(course_slug_hash:string){
      return await this.GET(`progress/bad-answers/${course_slug_hash}`).then(answers => {
          if(answers.hasOwnProperty('error')) throw new Error(answers.error_msg);
          return answers;
        });
    }

    async getAllUserCourseProgresses(user_id:string){
      return await this.GET(`progresses/${user_id}`).then(progresses => {
          if(progresses.hasOwnProperty('error')) throw new Error(progresses.error_msg);
          return progresses;
        });
    }
}

export default (context, inject) => {
  inject('api', new ApiService(context));
}
