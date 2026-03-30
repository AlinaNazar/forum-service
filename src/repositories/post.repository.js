import Post from '../models/post.model.js';

class PostRepository{
    async createPost(postData){
        return Post.create(postData);
    }

    async findPostById(id){
        return Post.findById(id);
    }
}

export default new PostRepository();