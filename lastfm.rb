today = Time.new
today = today.strftime("%Y-%m-%d")

puts "https://www.last.fm/user/usman6/library/tracks?from=#{today}&to=#{today}"
