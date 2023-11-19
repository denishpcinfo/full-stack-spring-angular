package com.back.d3n15tecback.repository;

import com.back.d3n15tecback.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByPublished(boolean published, Pageable pageable);
    
    Page<Book> findByTitleContaining(String title, Pageable pageable);
}