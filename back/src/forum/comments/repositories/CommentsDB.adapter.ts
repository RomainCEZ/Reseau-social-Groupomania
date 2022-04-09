import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "../../../Database/sequelizeModels/Comment.model";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";
import ICommentsRepository from "../interfaces/CommentsRepository";

@Injectable()
export default class CommentsDBAdapter implements ICommentsRepository {
    constructor(@InjectModel(CommentModel) private readonly commentModel: typeof CommentModel) { }

    async saveComment(postId: string, comment: Comment) {
        await this.commentModel.create<CommentModel>({
            commentId: comment.id,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            timestamp: comment.timestamp,
            postId
        })
    }
    async getPostCommentsByPostId(postId: string): Promise<Comment[]> {
        const postComments = await this.commentModel.findAll({ where: { postId }, order: ['timestamp'] })
        if (postComments.length === 0) {
            throw new NotFoundException()
        }
        return postComments.map(comment => Comment.create({
            id: comment.commentId,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            timestamp: +comment.timestamp
        })
        )
    }
    async getCommentById(commentId: string): Promise<Comment> {
        console.log(commentId + 'adapter')
        const comment = await this.commentModel.findOne({ where: { commentId } })
        return Comment.create({
            id: comment.commentId,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            timestamp: +comment.timestamp
        })
    }
    async updateCommentById(commentId: string, updatedContent: UpdateCommentDto) {
        const comment = await this.commentModel.findOne({ where: { commentId } })
        await comment.update({ ...updatedContent })
    }
    async deleteCommentById(commentId: string) {
        const comment = await this.commentModel.findOne({ where: { commentId } })
        await comment.destroy()
    }
}