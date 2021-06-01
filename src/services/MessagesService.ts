import { Messages } from '../entities/Messages'
import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMassageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
};

class MessagesService {
    private messagesRepository: Repository<Messages>

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }

    async create({admin_id, text, user_id} : IMassageCreate) {
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(message)

        return message;
    };

    async listByUser(user_id: string) {
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return list;
    };
};

export { MessagesService };