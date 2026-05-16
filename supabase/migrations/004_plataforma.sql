-- ─── PRODUTORES ──────────────────────────────────────────────────────────────
create table public.produtores (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users on delete cascade not null,
  nome       text not null,
  cpf        text,
  data_nasc  date,
  cidade     text,
  telefone   text,
  email      text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

alter table public.produtores enable row level security;

create policy "produtores_own" on public.produtores
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── TALHÕES ──────────────────────────────────────────────────────────────────
create table public.talhoes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  produtor_id uuid references public.produtores on delete set null,
  nome        text not null,
  area_ha     numeric,
  cultura     text,
  car         text,
  safra       text,
  created_at  timestamp with time zone default timezone('utc', now()),
  updated_at  timestamp with time zone default timezone('utc', now())
);

alter table public.talhoes enable row level security;

create policy "talhoes_own" on public.talhoes
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── INSUMOS (estoque base) ───────────────────────────────────────────────────
create table public.insumos (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users on delete cascade not null,
  nome           text not null,
  unidade        text not null default 'L',
  preco_unitario numeric default 0,
  quantidade     numeric default 0,
  vencimento     date,
  empresa        text,
  created_at     timestamp with time zone default timezone('utc', now()),
  updated_at     timestamp with time zone default timezone('utc', now())
);

alter table public.insumos enable row level security;

create policy "insumos_own" on public.insumos
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── MOVIMENTAÇÕES ────────────────────────────────────────────────────────────
create table public.movimentacoes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users on delete cascade not null,
  insumo_id  uuid references public.insumos on delete cascade not null,
  tipo       text not null check (tipo in ('entrada', 'saida')),
  quantidade numeric not null,
  preco_unit numeric,
  data_mov   date not null default current_date,
  nota       text,
  empresa    text,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table public.movimentacoes enable row level security;

create policy "movimentacoes_own" on public.movimentacoes
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── TRIGGER updated_at (reuse function from 002 if exists) ──────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_produtores_updated_at
  before update on public.produtores
  for each row execute procedure public.handle_updated_at();

create trigger set_talhoes_updated_at
  before update on public.talhoes
  for each row execute procedure public.handle_updated_at();

create trigger set_insumos_updated_at
  before update on public.insumos
  for each row execute procedure public.handle_updated_at();
