require 'sinatra'
use Rack::Deflater
use Rack::Static,
  :urls => ["/imgs", "/js", "/css"],
  :root => "public"
  
get '/' do
  File.read(File.join('public', 'index.html'))
end