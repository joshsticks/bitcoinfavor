require 'sinatra'
require 'json'
require 'bitcoin-3rd-party-apis'

use Rack::Deflater
use Rack::Static,
  :urls => ["/imgs", "/js", "/css"],
  :root => "public"
  
get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/balance/:hash' do
	#tidy up the balance and return it
	content_type :json
	BlockchainInfo.multiaddr(params[:hash]).to_json
end
