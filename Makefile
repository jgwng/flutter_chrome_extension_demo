# Makefile for Flutter project

chrome:
	@flutter build web --web-renderer html --csp

format:
	@dart format .


clean:
	@echo "Clean The Project"
	@rm -rf pubspec.lock
	@flutter clean

