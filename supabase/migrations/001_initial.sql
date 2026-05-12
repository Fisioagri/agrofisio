-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table public.profiles (
  id         uuid references auth.users on delete cascade primary key,
  email      text,
  name       text,
  role       text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Usuário lê o próprio perfil
create policy "users_read_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Admin lê todos os perfis
create policy "admin_read_all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin atualiza qualquer perfil (ex: mudar role)
create policy "admin_update_all"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ─── TRIGGER: cria perfil ao cadastrar usuário ────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── USUÁRIO ADMIN PADRÃO ─────────────────────────────────────────────────────
-- Execute manualmente no SQL Editor do Supabase após criar o usuário admin:
-- update public.profiles set role = 'admin' where email = 'seu-email@admin.com';
