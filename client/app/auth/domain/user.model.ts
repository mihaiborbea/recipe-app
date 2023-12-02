export class User {
  public profile: UserProfile;

  constructor(
    public id: string,
    public email: string,
    public token: string,
    avatarUrl: string
  ) {
    this.profile = new UserProfile(avatarUrl);
  }
}

class UserProfile {
  constructor(public avatarUrl: string) {}
}
