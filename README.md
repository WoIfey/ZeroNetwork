# ZeroNetwork

Check out our minecraft server where we host different modpacks and more, this is mostly for our friends.

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/WoIfey/ZeroNetwork.git
cd ZeroNetwork
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Initialize the database with docker**

Copy the `env.example` file and rename it to `.env`:

```bash
pnpm docker
```

4. **Run database migrations**

```bash
pnpm prisma
```

5. **Start the development server and prisma studio**

```bash
pnpm dev
```

```bash
pnpm studio or npx prisma studio
```
