import { Component, Input, OnInit } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() public user!: User | null;

  constructor() {}

  ngOnInit(): void {
    const buttons = document.querySelectorAll('.card-buttons button');
    const sections = document.querySelectorAll('.card-section');
    const card = document.querySelector('.card');

    const handleButtonClick = (e) => {
      const targetSection = e.target.getAttribute('data-section');
      const section = document.querySelector(targetSection);
      if (card != null) {
        targetSection !== '#about'
          ? card.classList.add('is-active')
          : card.classList.remove('is-active');
        card.setAttribute('data-state', targetSection);
      }
      sections.forEach((s) => s.classList.remove('is-active'));
      buttons.forEach((b) => b.classList.remove('is-active'));
      e.target.classList.add('is-active');
      section.classList.add('is-active');
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', handleButtonClick);
    });
  }
}
// citation: https://codepen.io/team/jotform/pen/XWmqoMp
// Copyright (c) 2022 by JotForm (https://codepen.io/team/jotform/pen/XWmqoMp)
// Permission is hereby granted, free of charge, to any person obtaining a copy of
//  this software and associated documentation files (the "Software"), to deal in
//   the Software without restriction, including without limitation the rights to use,
//    copy, modify, merge, publish, distribute, sublicense, and/or sell
