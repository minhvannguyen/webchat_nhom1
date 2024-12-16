package com.anhminh.minhminh.mapper;

import com.anhminh.minhminh.dto.FollowersDto;
import com.anhminh.minhminh.module.Followers;
import org.springframework.stereotype.Component;

@Component
public class FollowerMap {
    public Followers toEntity(FollowersDto followersDto)
    {
        Followers followes = new Followers();
        followes.setIdFollower(followersDto.getIdFollower());
        followes.setIdFollowing(followersDto.getIdFollowing());
        followes.setId(followersDto.getId());

        return followes;
    }

    public FollowersDto toDto(Followers followes)
    {
        FollowersDto followersDto = new FollowersDto();
        followersDto.setIdFollower(followes.getIdFollower());
        followersDto.setIdFollowing(followes.getIdFollowing());
        followersDto.setId(followes.getId());

        return followersDto;
    }
}
