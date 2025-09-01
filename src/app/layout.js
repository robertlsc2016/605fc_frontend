export default function RootLayout() {
  return (
    <html class="h-full w-full ">
      <body class="h-full min-h-screen m-0">
        <div id="app" class="flex flex-col min-h-screen ">
          <header class="bg-blue-600 text-white p-4">Header</header>

          <main class="flex-1 p-4 bg-gray-100 ">Conteúdo</main>

          <footer class="bg-gray-800 text-white p-4">Footer</footer>
        </div>
      </body>
    </html>
  );
}
