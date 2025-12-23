import { authService } from '../service/auth.service.js';
import { signUpSchema, signInSchema, SignUpRequestDTO, SignInRequestDTO } from '../dto/auth.dto.js';
import { validate } from '../utils/validation.js';
import { SUCCESS_MESSAGES } from '../constants/constants.js';
import { logger } from '../../../utils/logger.js';

/**
 * Auth controller for handling HTTP requests
 * Minimal controller - delegates to service layer
 */
class AuthController {
  /**
   * Sign up endpoint handler
   */
  async signUp(request, reply) {
    const validatedData = validate(signUpSchema, request.body);
    const signUpRequestDTO = new SignUpRequestDTO(validatedData);
    const userResponseDTO = await authService.signUp(signUpRequestDTO);

    logger.info('Sign up request processed', { email: validatedData.email });

    return reply.status(201).send({
      success: true,
      message: SUCCESS_MESSAGES.USER_CREATED,
      data: userResponseDTO.toJSON()
    });
  }

  /**
   * Sign in endpoint handler
   */
  async signIn(request, reply) {
    const validatedData = validate(signInSchema, request.body);
    const signInRequestDTO = new SignInRequestDTO(validatedData);
    const userResponseDTO = await authService.signIn(signInRequestDTO);

    logger.info('Sign in request processed', { email: validatedData.email });

    return reply.status(200).send({
      success: true,
      message: SUCCESS_MESSAGES.SIGN_IN_SUCCESSFUL,
      data: userResponseDTO.toJSON()
    });
  }
}

export const authController = new AuthController();

