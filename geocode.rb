#!/usr/bin/env ruby -w

require 'csv'
require 'json'
require 'net/http'
require 'cgi'

file = CSV.new(ARGF.file).read()

header = file[0].map{|x| x.strip}

result = file[1..-1].map do | line|
  postcode = line[0]
  url = "/maps/api/geocode/json?address=#{CGI.escape postcode}&sensor=false"
  JSON.parse(Net::HTTP.get("maps.googleapis.com",url))["results"][0] unless postcode.empty?
end

puts result.to_json
