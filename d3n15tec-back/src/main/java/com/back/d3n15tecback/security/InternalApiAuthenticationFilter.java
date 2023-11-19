package com.back.d3n15tecback.security;

import com.back.d3n15tecback.Util.SecurityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InternalApiAuthenticationFilter extends OncePerRequestFilter
{
    private final String accessKey;

    public InternalApiAuthenticationFilter(String accessKey)
    {
        this.accessKey = accessKey;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException
    {
        return !request.getRequestURI().startsWith("/api/internal");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException
    {
        try
        {
            String requestKey = SecurityUtils.extractAuthTokenFromRequest(request);

            if (requestKey == null || !requestKey.equals(accessKey))
            {
                throw new RuntimeException("UNAUTHORIZED");
            }

            UserPrincipal user = UserPrincipal.createSuperUser();
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        catch (Exception ex)
        {
            throw new RuntimeException("UNAUTHORIZED");
        }

        filterChain.doFilter(request, response);
    }
}