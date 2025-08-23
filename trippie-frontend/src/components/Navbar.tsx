export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  L
                </span>
              </div>
              <span className="text-xl font-bold">Logo</span>
            </a>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              {/* <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" /> */}
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
