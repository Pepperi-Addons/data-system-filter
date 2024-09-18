# Febula

## High Level
Febula operates as the front end of [Nebula](https://github.com/Pepperi-Addons/Nebula), it provide a user interface that allows admins to configure sync rules.

---

## Releases
Versions are coupled with [Nebula](https://github.com/Pepperi-Addons/Nebula) releases.

---

## Deployment
After a PR is merged into a release branch a version will be published and the exported integration tests will run.  
If the tests pass the version will be marked as available. 

---

## Testing

Integration tests are located at `/server-side/integration-tests`, they use the `addon-testing-framework` and are run automatically after a PR to a release branch, the results will be published to the `Nebula Alerts` Teams channel.

---

## Dependencies
| Addon | Usage |
|-------- |------------ |
| core_resources  | Allows us to set sync rules for core resources |
| generic_resource  | Allows us to set sync rules for user defined resources |
---

## APIs

- [`profile_filters`](https://apidesign.pepperi.com/febula/profile-fi2lter/upsert-profile-filter) - get and upsert [profile filters](./architecture.md#profile-filters).
- [`filters`](https://apidesign.pepperi.com/febula/filter/upsert-filter) - get and upsert [filters](architecture.md#filters).

[Postman Collection](./febula.postman_collection.json)

---

## Architecture
see: [Architecture](./architecture.md)

---

## Future Ideas & Plans
- Migrate profile filters to use profiles instead of employee types.

---

![rules](https://i.giphy.com/iB4PoTVka0Xnul7UaC.webp)