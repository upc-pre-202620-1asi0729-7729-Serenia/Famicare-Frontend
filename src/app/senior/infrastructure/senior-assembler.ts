import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Senior } from '../domain/model/senior.entity';
import { SeniorResource, SeniorResponse } from './senior-response';

export class SeniorAssembler implements BaseAssembler<Senior, SeniorResource, SeniorResponse> {
  toEntityFromResource(r: SeniorResource): Senior {
    return new Senior({ id: r.id, firstName: r.firstName, fullName: r.fullName, initials: r.initials, age: r.age });
  }

  toResourceFromEntity(e: Senior): SeniorResource {
    return { id: e.id, firstName: e.firstName, fullName: e.fullName, initials: e.initials, age: e.age };
  }

  toEntitiesFromResponse(response: SeniorResponse): Senior[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
