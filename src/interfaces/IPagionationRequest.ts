import { Request } from "express"
import { CustomRequest } from "../middleware/auth"

export interface PaginationRequest extends CustomRequest {
  page:number
  }
