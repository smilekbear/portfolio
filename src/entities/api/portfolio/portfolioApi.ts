import {PortfolioResponse} from "@/entities/dto/portfolio/portfolioDto";
import {api, HttpResponse} from "@/shared/api/http";

export function fetchPortfolio (): Promise<HttpResponse<PortfolioResponse>> {
 return api.get('/api/portfolio')
}