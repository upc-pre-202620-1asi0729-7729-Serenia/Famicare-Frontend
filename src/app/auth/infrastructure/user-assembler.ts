import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { User, CaregiverRole, SubscriptionPlan } from '../domain/model/user.entity';
import { UserResource } from './auth-response';

type UserResourceBase = UserResource & BaseResource;
type UserListResponse = UserResourceBase[] & BaseResponse;

export class UserAssembler implements BaseAssembler<User, UserResourceBase, UserListResponse> {
  toEntityFromResource(r: UserResourceBase): User {
    return new User({
      id:       r.id,
      fullName: r.fullName,
      email:    r.email,
      phone:    r.phone ?? '',
      role:     (r.role as CaregiverRole) ?? 'PRIMARY_CAREGIVER',
      plan:     (r.plan as SubscriptionPlan) ?? 'FAMILY',
    });
  }

  toResourceFromEntity(e: User): UserResourceBase {
    return { id: e.id, fullName: e.fullName, email: e.email, phone: e.phone, role: e.role, plan: e.plan };
  }

  toEntitiesFromResponse(response: UserListResponse): User[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
