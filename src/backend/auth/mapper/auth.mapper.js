import { UserResponseDTO } from '../dto/auth.dto.js';

/**
 * Auth mapper for converting entities to DTOs
 */
class AuthMapper {
  /**
   * Map user entity to UserResponseDTO
   * @param {object} userEntity - User entity from database
   * @returns {UserResponseDTO} User response DTO
   */
  toUserResponseDTO(userEntity) {
    if (!userEntity) {
      return null;
    }

    // Extract only the fields we want to expose
    const userData = {
      id: userEntity.id,
      email: userEntity.email,
      firstName: userEntity.firstName || null,
      lastName: userEntity.lastName || null,
      isActive: userEntity.isActive,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt
    };

    return new UserResponseDTO(userData);
  }
}

export const authMapper = new AuthMapper();

