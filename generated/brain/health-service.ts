import { Injectable } from "@nestjs/common";
@Injectable()
export class HealthService {
    status(): string {
        return "ok";
    }
}
