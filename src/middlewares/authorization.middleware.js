import postRepository from "../repositories/post.repository.js";

class Authorization {

    hasRole(role) {
        return (req, res, next) => req.principal.roles.includes(role.toUpperCase().trim())
            ? next() : res.status(403).json({message: 'Access denied'});
    }

    isOwner(paramName = 'author') {
        return (req, res, next) => {
            req.params[paramName] === req.principal.userName
                ? next() : res.status(403).json({message: 'Access denied you are not owner' });
        }
    }

    isOwnerOrHasRole(paramName, role) {
        return (req, res, next) => {
            // console.log(req.params[paramName])
            // console.log(req.principal.userName)
            req.principal.roles.includes(role.toUpperCase().trim()) || req.params[paramName] === req.principal.userName
                ? next() : res.status(403).json({message: 'Access denied 3' });
        }
    }

    isAuthorPost(idParams = 'id') {
        return async (req, res, next) => {
            const postId = req.params[idParams];
            const post = await postRepository.findPostById(postId);
            post.author === req.principal.userName
                ? next() : res.status(403).json({message: 'Access denied you not author' });
        }
    }

    isAuthorPostOrHasRole(idParams, role) {
        return async (req, res, next) => {
            const postId = req.params[idParams];
            const post = await postRepository.findPostById(postId);
                    req.principal.roles.includes(role) || post.author === req.principal.userName
                ? next() : res.status(403).json({message: 'Access denied you not author' });
        }
    }
}

export default new Authorization();