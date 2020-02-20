today = Time.new
today = today.strftime("%Y-%m-%d")

puts "https://www.last.fm/user/usmanity/library?from=#{today}&to=#{today}"
