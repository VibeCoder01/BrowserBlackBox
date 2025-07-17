export function Header() {
  return (
    <header className="py-8 px-4 text-center">
      <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground">
        Browser<span className="text-primary">BlackBox</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        An interactive tool to reveal the hidden data your browser stores about you. All scans run entirely on your machine—no data is ever sent or saved.
      </p>
    </header>
  );
}
